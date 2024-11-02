import axios from 'axios';

export const findRandomImages = async (limit, page, order) => {
  try {
    const response = await axios.get(
      `${process.env.API_BASE_URL}?limit=${limit}&page=${page}&order=${order}&api_key=${process.env.API_KEY}`
    );
    return { imageDataArray: response.data, status: 200 };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 429) {
        return { message: 'Rate limit exceeded', status: 429 };
      }
    }

    return { message: `Axios request failed: ${error.message}`, status: 500 };
  }
};

export const findImagesByBreeds = async (
  limit,
  page,
  order,
  breedIds
) => {
  try {
    const response = await axios.get(
      `${process.env.API_BASE_URL}?limit=${limit}&page=${page}&order=${order}&breed_ids=${breedIds}&api_key=${process.env.API_KEY}`
    );
    return { imageDataArray: response.data, status: 200 };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 429) {
        return { message: 'Rate limit exceeded', status: 429 };
      }
    }

    return { message: `Axios request failed: ${error.message}`, status: 500 };
  }
};

// Converts cat breed names to breed IDs
export const findBreedIds = (breeds) => {
  const breedMap = new Map([
    ['abyssinian', 'abys'],
    ['aegean', 'aege'],
    ['american bobtail', 'abob'],
    ['american curl', 'acur'],
    ['american shorthair', 'asho'],
    ['american wirehair', 'awir'],
    ['arabian mau', 'amau'],
    ['australian mist', 'amis'],
    ['balinese', 'bali'],
    ['bambino', 'bamb'],
    ['bengal', 'beng'],
    ['birman', 'birm'],
    ['bombay', 'bomb'],
    ['british longhair', 'bslo'],
    ['british shorthair', 'bsho'],
    ['burmese', 'bure'],
    ['burmilla', 'buri'],
    ['california spangled', 'cspa'],
    ['chantilly-tiffany', 'ctif'],
    ['chartreux', 'char'],
    ['chausie', 'chau'],
    ['cheetoh', 'chee'],
    ['colorpoint shorthair', 'csho'],
    ['cornish rex', 'crex'],
    ['cymric', 'cymr'],
    ['cyprus', 'cypr'],
    ['devon rex', 'drex'],
    ['donskoy', 'dons'],
    ['dragon li', 'lihu'],
    ['egyptian mau', 'emau'],
    ['european burmese', 'ebur'],
    ['exotic shorthair', 'esho'],
    ['havana brown', 'hbro'],
    ['himalayan', 'hima'],
    ['japanese bobtail', 'jbob'],
    ['javanese', 'java'],
    ['khao manee', 'khao'],
    ['korat', 'kora'],
    ['kurilian', 'kuri'],
    ['laperm', 'lape'],
    ['maine coon', 'mcoo'],
    ['malayan', 'mala'],
    ['manx', 'manx'],
    ['munchkin', 'munc'],
    ['nebelung', 'nebe'],
    ['norwegian forest cat', 'norw'],
    ['ocicat', 'ocic'],
    ['oriental', 'orie'],
    ['persian', 'pers'],
    ['pixie-bob', 'pixi'],
    ['ragamuffin', 'raga'],
    ['ragdoll', 'ragd'],
    ['russian blue', 'rblu'],
    ['savannah', 'sava'],
    ['scottish fold', 'sfol'],
    ['selkirk rex', 'srex'],
    ['siamese', 'siam'],
    ['siberian', 'sibe'],
    ['singapura', 'sing'],
    ['snowshoe', 'snow'],
    ['somali', 'soma'],
    ['sphynx', 'sphy'],
    ['tonkinese', 'tonk'],
    ['toyger', 'toyg'],
    ['turkish angora', 'tang'],
    ['turkish van', 'tvan'],
    ['york chocolate', 'ycho'],
  ]);

  const trimmedBreeds = breeds.map(breed => breed.trim().toLowerCase())

  const breedIdArray = trimmedBreeds
    .map((catBreed) => breedMap.get(catBreed))
    .filter((breedId) => breedId !== undefined);
  // Will return an empty array if no matching breeds are found
  return breedIdArray;
};
