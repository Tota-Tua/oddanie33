/*
    Modifies the retreat description from res (url), the days are modified and look like that:
    [{
        ...
        data: [
        {
            title: '„BÓG POSŁAŁ ANIOŁA” (Łk 1,26)',
            subtitle: 'Wersja ogólna',
            url: 'https://oddanie33.pl/dzien-1/tekst',
            day: 1,
        },
        {
            title: '"„DO DZIEWICY POŚLUBIONEJ MĘŻOWI, IMIENIEM JÓZEF” (Łk 1,27)',
            subtitle: 'Wersja ogólna',
            url: 'https://oddanie33.pl/dzien-2/tekst',
            day: 2,
        },
    }];
*/
import description from '../res/retreatData/description';

const parsedData = description.map(singleRetreat => {
  const newRetreat = ['title', 'subtitle', 'illustration'].reduce(
    (result, key) => {
      result[key] = singleRetreat[key];
      return result;
    },
    {},
  );
  const data = singleRetreat.data;

  newRetreat.data = data.map((dayInfo, index) => {
    const {title, subtitle} = dayInfo;
    return {
      title,
      subtitle,
      day: index + 1,
      url: generateUrl(index, singleRetreat.urlPattern),
    };
  });
  return newRetreat;
});

function generateUrl(index, urlPattern) {
  return urlPattern.replace('${number}', index + 1);
}

export default parsedData;
