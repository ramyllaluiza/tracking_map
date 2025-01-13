import { MapNewRoute } from "./MapNewRoute";
import { NewRouteForm } from "./NewRouteForm";
import { FaTruck, FaInstagram, FaGithub } from "react-icons/fa";

export async function searchDirections(source: string, destination: string) {
  const [sourceResponse, destinationResponse] = await Promise.all([
    fetch(`http://localhost:3000/places?text=${source}`),
    fetch(`http://localhost:3000/places?text=${destination}`),
  ]);

  if (!sourceResponse.ok || !destinationResponse.ok) {
    throw new Error("Failed to fetch location data");
  }

  const [sourceData, destinationData] = await Promise.all([
    sourceResponse.json(),
    destinationResponse.json(),
  ]);

  const placeSourceId = sourceData.candidates[0].place_id;
  const placeDestinationId = destinationData.candidates[0].place_id;

  const directionsResponse = await fetch(
    `http://localhost:3000/directions?originId=${placeSourceId}&destinationId=${placeDestinationId}`
  );

  if (!directionsResponse.ok) {
    throw new Error("Failed to fetch directions");
  }

  const directionsData = await directionsResponse.json();

  return { directionsData, placeSourceId, placeDestinationId };
}

export async function NewRoutePage({
  searchParams,
}: {
  searchParams: Promise<{ source: string; destination: string }>;
}) {
  const { source, destination } = await searchParams;

  const result =
    source && destination ? await searchDirections(source, destination) : null;
  const directionsData = result?.directionsData || null;
  const placeSourceId = result?.placeSourceId || null;
  const placeDestinationId = result?.placeDestinationId || null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="w-full bg-[#87CEEB] p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaTruck className="text-white text-2xl" />
          <h1 className="text-white text-2xl font-bold">Imersão 20 - Full Cycle</h1>
        </div>
      </header>

      {/* Conteúdo principal */}
      <div className="flex flex-col lg:flex-row flex-1">
        <div className="w-full lg:w-1/3 p-4">
          <h4 className="text-3xl text-contrast mb-2">Nova Rota</h4>
          <form className="flex flex-col space-y-4" method="get">
            {/* Campo de origem */}
            <div className="relative">
              <input
                id="source"
                name="source"
                type="search"
                placeholder=" "
                defaultValue={source}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-contrast bg-default border-0 border-b-2 border-contrast focus:outline-none focus:ring-0 focus:border-primary peer"
              />
              <label
                htmlFor="source"
                className="absolute text-contrast duration-300 transform -translate-y-4 scale-75 top-3 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Origem
              </label>
            </div>
            {/* Campo de destino */}
            <div className="relative">
              <input
                id="destination"
                name="destination"
                type="search"
                placeholder=" "
                defaultValue={destination}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-contrast bg-default border-0 border-b-2 border-contrast focus:outline-none focus:ring-0 focus:border-primary peer"
              />
              <label
                htmlFor="destination"
                className="absolute text-contrast duration-300 transform -translate-y-4 scale-75 top-3 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Destino
              </label>
            </div>
            <button
              type="submit"
              className="bg-main text-primary p-2 rounded text-xl font-bold"
            >
              Pesquisar
            </button>
          </form>
          {directionsData && (
            <div className="mt-4 p-4 border rounded text-contrast">
              <ul>
                <li className="mb-2">
                  <strong>Origem:</strong>{" "}
                  {directionsData.routes[0].legs[0].start_address}
                </li>
                <li className="mb-2">
                  <strong>Destino:</strong>{" "}
                  {directionsData.routes[0].legs[0].end_address}
                </li>
                <li className="mb-2">
                  <strong>Distância:</strong>{" "}
                  {directionsData.routes[0].legs[0].distance.text}
                </li>
                <li className="mb-2">
                  <strong>Duração:</strong>{" "}
                  {directionsData.routes[0].legs[0].duration.text}
                </li>
              </ul>
              <NewRouteForm>
                {placeSourceId && (
                  <input
                    type="hidden"
                    name="sourceId"
                    defaultValue={placeSourceId}
                  />
                )}
                {placeDestinationId && (
                  <input
                    type="hidden"
                    name="destinationId"
                    defaultValue={placeDestinationId}
                  />
                )}
                <button
                  type="submit"
                  className="bg-main text-primary font-bold p-2 rounded mt-4"
                >
                  Adicionar Rota
                </button>
              </NewRouteForm>
            </div>
          )}
        </div>
        <div className="w-full lg:w-2/3">
          <MapNewRoute directionsData={directionsData} />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#87CEEB] text-white py-4">
        <div className="container mx-auto flex flex-col items-center space-y-4">
          {/* Ícones centralizados */}
          <div className="flex space-x-6 justify-center">
            {/* Ícone do Instagram */}
            <a
              href="https://www.instagram.com/ramyyh_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition"
            >
              <FaInstagram size={25} />
            </a>

            {/* Ícone do GitHub */}
            <a
              href="https://github.com/ramyllaluiza"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition"
            >
              <FaGithub size={25} />
            </a>
          </div>

          {/* Texto centralizado */}
          <p className="text-sm text-center">
            Ramylla Barbalho © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default NewRoutePage;
