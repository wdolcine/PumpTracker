

const getRoute = async (start :  { latitude: number; longitude: number },end: { latitude: number; longitude: number },mode:string) => {
    const apiKey ="b4aebb9f53174b77b1d406df04afa61d";
    const url = `https://api.geoapify.com/v1/routing?waypoints=${start.latitude},${start.longitude}|${end.latitude},${end.longitude}&mode=${mode}&apiKey=${apiKey}`;


    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      console.log("GetRoute response!!!!!!",data);

      if(data.features && data.features.length > 0) {
        const route = data.features[0];
        const distance = route.properties.distance / 1000;
        const duration = route.properties.time / 60;

        return { route, distance, duration};

      } else{
        console.error("Aucun itineraire trouve.")
      }
    } catch (error) {
      console.error("Error fetching gas stations:", error);
    //   setErrorMsg("Error fetching gas stations");
    }
    return null;
  };
  export default getRoute;