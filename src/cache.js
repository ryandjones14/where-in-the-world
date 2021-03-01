import { InMemoryCache, Reference, makeVar } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        photos: {
          keyArgs: false,
          merge(existing, incoming) {
            let photos = [];
            if (existing && existing.length > 0) {
              photos = photos.concat(existing);
            }
            if (incoming && incoming.length > 0) {
              photos = photos.concat(incoming);
            }
            return photos;
          }
        }
      }
    }
  }
});

const photoVar = makeVar(null);
const scoreVar = makeVar(0);

export const stateOps = {
  readPhoto() {
    return photoVar();
  },
  changePhoto(photo) {
    photoVar(photo);
  },
  readScore() {
    return scoreVar();
  },
  incScore() {
    let score = scoreVar();
    score++;
    scoreVar(score);
  }
}

