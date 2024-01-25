import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getToken} from '../../services/AsyncStorageService';
import {useGetLoggedUserQuery} from '../../services/userAuthApi';

const Address = () => {
  const [userLToken, setUserLToken] = useState();

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  let Address = [];

  const {data, isSuccess, isError, error} = useGetLoggedUserQuery(userLToken, {
    refetchOnMountOrArgChange: true,
  });

  isSuccess && Address.push(data.additional_address);

  isError && console.log('errs', error);

  if (isSuccess) {
    console.log(Address[0], 'dataadd');
  }
  return (
    <SafeAreaView>
      <View>
        {/* isSuccess && {} */}
        {Address.map((item, index) => (
          <Card>
            <Card.Title style={{textTransform: 'uppercase'}}>
              <Text>{item.type}</Text>
            </Card.Title>
            <Text>{item.city}</Text>
            <Text>{item.district}</Text>
            <Text>{item.state}</Text>
            <Text>{item.pincode}</Text>
            <Text>{item.street_1}</Text>
            <Text>{item.street_2}</Text>
          </Card>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Address;
