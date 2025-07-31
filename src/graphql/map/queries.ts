import {gql} from 'graphql-request';

export const MAP_GET_DISTANCE = gql`
  query map_getDistance($origin: String, $destination: String) {
    map_getDistance(origin: $origin, destination: $destination) {
      originAddress
      destinationAddresses
      distance {
        text
        value
      }
      duration {
        text
        value
      }
      durationInTraffic {
        text
        value
      }
    }
  }
`;
