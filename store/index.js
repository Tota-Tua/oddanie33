import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveData() {
  function provideFakeData() {
    return [
      {
        title: '„BÓG POSŁAŁ ANIOŁA” (Łk 1,26)',
        subtitle: 'Wersja ogólna',
        url: 'https://oddanie33.pl/dzien-1/tekst',
      },
      {
        title: '„DO DZIEWICY POŚLUBIONEJ MĘŻOWI, IMIENIEM JÓZEF” (Łk 1,27)',
        subtitle: 'Wersja ogólna',
        url: 'https://oddanie33.pl/dzien-2/tekst',
      },
      {
        title: '„BĄDŹ POZDROWIONA, PEŁNA ŁASKI, PAN Z TOBĄ” (Łk 1,28)',
        subtitle: 'Wersja ogólna',
        url: 'https://oddanie33.pl/dzien-3/tekst',
      },
      {
        title:
          '„OTO POCZNIESZ I PORODZISZ SYNA, KTÓREMU NADASZ IMIĘ JEZUS” (Łk 1,31)',
        subtitle: 'Wersja ogólna',
        url: 'https://oddanie33.pl/dzien-4/tekst',
      },
    ];
  }

  await AsyncStorage.setItem('favorites', JSON.stringify(provideFakeData()));
}

export default saveData;
