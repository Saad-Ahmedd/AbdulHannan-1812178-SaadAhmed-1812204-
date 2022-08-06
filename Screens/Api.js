


import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
// import { VictoryChart, VictoryGroup, VictoryBar, VictoryLine } from 'victory-native';

export default Api = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

const fetchApi=()=>{

    //     const response = fetch('http://192.168.0.102:5000/sale_prediction')
    //     .then(response => {response.toString()
    //     console.log(response[0])})

    //    .catch(e=>{
    //         console.log("error occur")
    //    })

    fetch('http://192.168.0.102:5000/sale_prediction')
      .then((response) => setData(response))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

};


  useEffect(() => {
        fetchApi();
  }, []);
  


  return (

    <View style={{ flex: 1, padding: 24 }}>


  {isLoading ? <Text>Loading...</Text> : 
  ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
      {/* <Text style={{ fontSize: 18, color: 'green', textAlign: 'center'}}>{data.title}</Text> */}
      <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>Values:</Text>
      <FlatList
        data={data.dat}
        renderItem={({ item }) => (
          <Text>{item }</Text>
        )}
      />
    </View>
  )}

     
       {/* <VictoryChart>
     <VictoryGroup>
     <VictoryLine
    interpolation="natural"
    data={[
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 6 }
    ]}
  />
    </VictoryGroup>
</VictoryChart>  */}
    </View>
  );
};

