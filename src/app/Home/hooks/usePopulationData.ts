"use client"
import { Options } from 'highcharts';
import { fetcher } from '@/api/resasApiClient';
import { useState, useEffect, useContext } from 'react';
import { PopulationContext } from '../context/PopulationContext';
import { Prefecture, PopulationList, PopulationCompositionResponse, PopulationCompositionResponseSchema } from "../types";

type usePopulationRes = {
  populationList: PopulationList[],
  fetchPopulationData: (prefecture: Prefecture, isChecked: boolean) => void,
  highchartsOptions: Options | undefined,
}

const usePopulationData = (): usePopulationRes => {
  const [populationList, setPopulationList] = useState<PopulationList[]>([]);
  const [highchartsOptions, setHighchartsOptions] = useState<Options | undefined>(undefined);
  const populationContext = useContext(PopulationContext);

  const fetchPopulationData = async (prefecture: Prefecture, isChecked: boolean) => {
    if (!isChecked) {
      setPopulationList(populationList.filter(data => data.prefCode !== prefecture.prefCode))
      return
    }
    const data  = await fetcher<PopulationCompositionResponse>(
      `/population/composition/perYear?prefCode=${prefecture.prefCode}`,
      PopulationCompositionResponseSchema
    );

    const populationData = data?.result.data.filter((data) => data.label === "総人口")[0].data?.map((data) => ({ year: data.year, value: data.value }));
    if (Array.isArray(populationData) && populationData.length > 0) {
      const newPopulationData: PopulationList = {
        prefCode: prefecture.prefCode,
        prefName: prefecture.prefName,
        populationData: populationData,
      };
      const newSetList = [...populationList, newPopulationData]
      setPopulationList(newSetList);
    }}
useEffect(() => {
  const setHighCharts = {
    title: {
      text: '都道府県別の総人口推移',
    },
    xAxis: {
      title: {
        text: '年度',
      },
      categories: populationList[0]?.populationData.map((data) => data.year.toString()),
    },
    yAxis: {
      title: {
        text: '人口数',
      },
    },
    series: populationList.map((data) => ({
      type: 'line' as const,
      name: data.prefName,
      data: data.populationData.map((populationData) => populationData.value),
    })),
  };
  setHighchartsOptions(setHighCharts);
  populationContext.highchartsOptions = setHighCharts;
}, [populationList]);

  return {
    populationList,
    fetchPopulationData,
    highchartsOptions,
  };
};

export default usePopulationData;
