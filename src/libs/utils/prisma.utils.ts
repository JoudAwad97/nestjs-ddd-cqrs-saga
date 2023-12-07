import { Prisma } from '@prisma/client';

type OrderByFieldExtractorOutput = {
  [key: string]: SortingType;
};

type SortingType = 'asc' | 'desc';

export function orderByFieldExtractor(
  prismaModelName: Prisma.ModelName,
  fieldName: string,
  sortingType: 'asc' | 'desc',
): OrderByFieldExtractorOutput {
  const allowedFields = Prisma.dmmf.datamodel.models
    .find((model) => model.name === prismaModelName)
    .fields.map((field) => field.name);

  if (allowedFields.includes(fieldName)) {
    return {
      [fieldName]: sortingType,
    };
  }
  return {
    id: sortingType,
  };
}
