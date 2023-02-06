import { type FC } from "react";

const HomePage: FC = () => {
  return (
    <div className="ctw-container flex flex-col gap-5">
      <h1 className="text-3xl my-10">Welcome to the Example App</h1>
      <p>Click on the "Task" link in the navbar to see an example of a page</p>
    </div>
  );
};

export default HomePage;
