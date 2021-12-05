import { graphql, Source } from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import { createSchema } from "./createSchema";

interface IGraphCall {
  source: string | Source;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

export const graphCall = async ({ source, variableValues }: IGraphCall) => {
  return await graphql({
    schema: await createSchema(),
    source,
    variableValues,
  });
};
