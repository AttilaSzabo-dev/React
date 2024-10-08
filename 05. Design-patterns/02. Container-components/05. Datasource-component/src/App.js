import axios from "axios";
import { BookInfo } from "./components/book-info";
import { DataSource } from "./components/data-source";
import { UserInfo } from "./components/user-info";

const fetchData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

function App() {
  return (
    <>
      <DataSource getData={() => fetchData("/users/1")} resourceName={"user"}>
        <UserInfo />
      </DataSource>
    </>
  );
}

export default App;
