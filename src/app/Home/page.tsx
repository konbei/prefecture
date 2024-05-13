"use client"
import './styles.css';
import { fetcher } from '@/api/resasApiClient';
import Header from '@/components/Layout/header';
import React, { useState, useEffect } from 'react';
import usePopulationData from './hooks/usePopulationData';
import PopulationGraph from './components/PopulationGraph';
import { PopulationContext } from './context/PopulationContext';
import PrefectureCheckboxes from './components/PrefectureCheckboxes';
import { Prefecture, PrefectureResponse, PrefectureResponseSchema } from './types';


const Home: React.FC = () => {
    return (
        <>
            <PopulationContext.Provider value={{ highchartsOptions: undefined }}>
                <PopulationChart />
            </PopulationContext.Provider>
        </>
    );
};

const PopulationChart: React.FC = () => {

    const [prefecture, setPrefecture] = useState<Prefecture[] | null>(null);
    const { fetchPopulationData } = usePopulationData()


    const fetchData = async () => {
        const data = await fetcher<PrefectureResponse>('/prefectures', PrefectureResponseSchema);
        setPrefecture(data.result);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePrefectureChange = (prefCode: number, checked: boolean) => {
        const targetPrefecture = prefecture?.find(data => data.prefCode === prefCode);
        if (targetPrefecture) {
            fetchPopulationData(targetPrefecture, checked);
        }
    };

    return (
        // highchartsOptionsを使用してチャートをレンダリングする
        <div className="home">
            <Header />
            <main className="container">
                <section className="prefecture-section">
                    <h2>都道府県選択</h2>
                    {prefecture ? (
                        <PrefectureCheckboxes prefectures={prefecture} onChange={handlePrefectureChange} />
                    ) : (
                        <p>Loading prefectures...</p>
                    )}
                </section>
                <section className="graph-section">
                    <h2>人口構成グラフ</h2>
                    <PopulationGraph />
                </section>
            </main>
        </div>
    );
};

export default Home;