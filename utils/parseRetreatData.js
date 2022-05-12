/*
    Modifies the retreat description from res (url), the days are modified and look like that:
    [{
        ...
        data: [
        {
            title: '„BÓG POSŁAŁ ANIOŁA” (Łk 1,26)',
            subtitle: 'Wersja ogólna',
            url: 'https://oddanie33.pl/dzien-1/tekst',
        },
        {
            title: '"„DO DZIEWICY POŚLUBIONEJ MĘŻOWI, IMIENIEM JÓZEF” (Łk 1,27)',
            subtitle: 'Wersja ogólna',
            url: 'https://oddanie33.pl/dzien-2/tekst',
        },
    }];
*/
import data from '../res/retreatData/description';

const parsedData = data.map(singleRetreat => {
  const newRetreat = ['title', 'subtitle', 'illustration'].reduce(
    (result, key) => {
      result[key] = singleRetreat[key];
      return result;
    },
    {},
  );
  const data = singleRetreat.data;

  newRetreat.data = data.map((day, index) => {
    const {title, subtitle} = day;
    return {
      title,
      subtitle,
      url: generateUrl(index, singleRetreat.urlPattern),
    };
  });
  return newRetreat;
});

function generateUrl(index, urlPattern) {
  return urlPattern.replace('${number}', index);
}

export default parsedData;
