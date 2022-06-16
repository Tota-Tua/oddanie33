import React from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';

const ErrorPage = ({navigation}) => {
  const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      marginBottom: 20,
    },
    btn: {
      margin: 2,
    },
  };

  return (
    <Layout style={styles.container}>
      <Text style={styles.text}>Nie można załadować zawartości.</Text>
      <Text style={styles.text}>Problem z dostępem do Internetu.</Text>
      <Text style={styles.text}>Spróbuj póżniej</Text>
      <Text style={styles.text} />
      <Button
        style={styles.btn}
        appearance="outline"
        status="danger"
        onPress={() => navigation.goBack()}>
        Cofnij
      </Button>
    </Layout>
  );
};

export default ErrorPage;
