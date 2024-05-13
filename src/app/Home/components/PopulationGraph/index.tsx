"use client"
import './styles.css';
import Highcharts from 'highcharts';
import React, { useContext } from 'react';
import HighchartsReact from 'highcharts-react-official';
import { PopulationContext } from '../../context/PopulationContext';


const PopulationGraph: React.FC<{}> = () => {
    const { highchartsOptions } = useContext(PopulationContext);
    return (
        <div className="population-graph">
            {highchartsOptions && <HighchartsReact highcharts={Highcharts} options={highchartsOptions} />}
        </div>
    );
};

export default PopulationGraph;