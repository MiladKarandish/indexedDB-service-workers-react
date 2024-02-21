export const getPartners = async () => {
  try {
    const res = await fetch("https://stage-api-rghm.iran.liara.run/partners", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NWQxYjJkN2RkMmE5NjVhYmIzNDIzNDgiLCJyb2xlIjoidXNlciIsInVzZXJJRCI6IjY1Y2M1YjBjMjUxOGZmMTkxZDYzMTZlYSIsImlhdCI6MTcwODI0MTYyMywiZXhwIjoyNzYyODI0MTYyM30.dBrQbQXHwyrAu0UvmdD2FKGbliE1UdP-SIJag3klC_8",
      },
    });

    const resData = await res.json();
    return resData;
  } catch (error) {
    console.log(error);
  }
};
