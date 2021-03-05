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
        },
        score: {
          keyArgs: false,
          read() {
            return scoreVar();
          }
        },
        photo: {
          keyArgs: false,
          read() {
            return photoVar();
          }
        },
        answerChoices: {
          read() {
            return answerChoicesVar();
          }
        }
      }
    }
  }
});

const photoVar = makeVar(null);
const scoreVar = makeVar(0);
const answerChoicesVar = makeVar([]);
const usedPhotoCountVar = makeVar(0);
const isCompleteVar = makeVar(false);

export const stateOps = {
  photoVar,
  scoreVar,
  answerChoicesVar,
  usedPhotoCountVar,
  isCompleteVar,
}

