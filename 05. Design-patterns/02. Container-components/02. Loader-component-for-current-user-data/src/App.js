import { UserInfo } from "./components/user-info";
import { UserLoader } from "./components/user-loader";

function App() {
  return (
    <>
      <UserLoader userId={"1"}>
        <UserInfo />
      </UserLoader>

      <UserLoader userId={"2"}>
        <UserInfo />
      </UserLoader>

      <UserLoader userId={"3"}>
        <UserInfo />
      </UserLoader>
    </>
  );
}

export default App;
