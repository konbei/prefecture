import { z } from 'zod';

const PrefectureSchema = z.object({
    prefCode: z.number(),
    prefName: z.string(),
});

export const PrefectureResponseSchema = z.object({
    message: z.string().nullable(),
    result: z.array(PrefectureSchema),
});

export type Prefecture = z.infer<typeof PrefectureSchema>;
export type PrefectureResponse = z.infer<typeof PrefectureResponseSchema>;


const PopulationDataSchema = z.object({
    year: z.number(),
    value: z.number(),
    rate: z.number().optional(),
});

const PopulationLabelSchema = z.object({
    label: z.string(),
    data: z.array(PopulationDataSchema),
});

const PopulationCompositionSchema = z.object({
    boundaryYear: z.number(),
    data: z.array(PopulationLabelSchema),
});

export const PopulationCompositionResponseSchema = z.object({
    message: z.string().nullable(),
    result: PopulationCompositionSchema,
});

export type PopulationData = z.infer<typeof PopulationDataSchema>;
export type PopulationLabel = z.infer<typeof PopulationLabelSchema>;
export type PopulationComposition = z.infer<typeof PopulationCompositionSchema>;
export type PopulationCompositionResponse = z.infer<typeof PopulationCompositionResponseSchema>;

export type PopulationList = {
    prefCode: number;
    prefName: string
    populationData: {
        year: number;
        value: number;
    }[];
}