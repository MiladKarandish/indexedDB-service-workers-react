import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Partner, db } from "./database/db";
import { getPartners } from "./services/partners";
import { Virtuoso } from "react-virtuoso";

function App() {
  const [status, setStatus] = useState("");
  // const [partners, setPartners] = useState<Partner[]>([]);
  const partners = useLiveQuery(() => db.partners?.toArray());

  // const getData = async () => {
  //   const data = await db.partners.toArray();

  //   console.log(data);

  //   // setPartners(() => [...data]);
  // };

  const registerServiceWorker = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service worker registration successful with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.log("Service worker registration failed:", error);
        });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const resData = await getPartners();

        const data = new Set<Partner>(resData);

        const id = await db.partners.bulkPut(Array.from(data));

        setStatus(`successfully added. Got id ${id}`);
      } catch (error) {
        setStatus(`Failed to add: ${error}`);
      }
    })();
  }, []);

  return (
    <main style={{ width: "100%" }}>
      <p>{status}</p>

      <button onClick={registerServiceWorker}>click to add</button>

      <Virtuoso
        style={{ width: "100%", height: "90dvh" }}
        data={partners}
        itemContent={(_, partner) => (
          <div
            style={{
              padding: "1rem 0.5rem",
              marginBottom: "1rem",
              backgroundColor: "coral",
            }}
          >
            <h4>{partner.name}</h4>
            <div style={{ marginTop: "1rem" }}>{partner.id}</div>
          </div>
        )}
      />
    </main>
  );
}

export default App;
