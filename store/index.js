import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveData() {
  function provideFakeData() {
    return [
      {
        title: '„BÓG POSŁAŁ ANIOŁA” (Łk 1,26)',
        subtitle: 'Wersja ogólna',
        url: 'https://oddanie33.pl/dzien-3/tekst',
      },
      {
        title: 'Bu bu bu',
        subtitle: 'Wersja dla ksiezy',
        url: 'https://oddanie33.pl/dzien-23/tekst',
      },
    ];
  }

  await AsyncStorage.setItem('favorites', JSON.stringify(provideFakeData()));
}

export default saveData;
