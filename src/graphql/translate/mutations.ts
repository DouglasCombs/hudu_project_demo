import {gql} from 'graphql-request';

export const TRANSLATE = gql`
  mutation translator_translate($input: TranslateInput) {
    translator_translate(input: $input) {
      result
      status
    }
  }
`;
