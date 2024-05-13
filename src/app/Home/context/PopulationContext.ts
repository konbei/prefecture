import { Options } from 'highcharts';
import { createContext } from 'react';

type PopulationContextType = {
  highchartsOptions: Options | undefined;
};

export const PopulationContext = createContext<PopulationContextType>({
  highchartsOptions: undefined,
});