import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        "https://xcountries-backend.azurewebsites.net/all"
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <Grid container style={{ padding: "2rem", margin: "1rem" }}>
        {data &&
          data.map((item) => (
            <Grid
              item
              xs={10}
              sm={6}
              md={4}
              lg={2}
              xl={1.5}
              key={item.id}
              style={{
                border: "0.5px solid black",
                padding: "1rem",
                margin: "0.2rem",
                textAlign: "center",
              }}
            >
              <img
                src={item.flag}
                alt={`Flag of ${item.name}`}
                style={{ height: "100px", width: "100px", objectFit: "cover" }}
              />
              <p style={{ margin: "8px 0", fontWeight: "bold" }}>{item.name}</p>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default App;
