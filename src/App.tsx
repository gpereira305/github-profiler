import { Link, Outlet } from "@tanstack/react-router";
import Header from "./components/Header";
import MainLayout from "./components/shared/MainLayout";
export default function App() {
  return (
    <>
      <Header />
      <MainLayout>
        <h1 className="hidden">Github profile</h1>
        <aside className="bg-purple-300 flex-1">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nam
            dolores earum reprehenderit atque, soluta aliquid odit error quaerat
            tempora obcaecati et tempore aperiam blanditiis velit facilis,
            inventore, fuga voluptatibus vitae debitis harum rem cumque
            quibusdam. Earum quod aliquam iusto. Nesciunt beatae magni
            voluptatem rem enim quo, mollitia assumenda eum quam adipisci rerum
            earum dolores laborum ad at laboriosam impedit ab veritatis
            aspernatur explicabo nobis deleniti aut. Iusto fugit sequi, suscipit
            voluptate deleniti nobis aliquid ab earum perferendis cumque error
            et rerum eligendi quos, quia ullam! Error et expedita ab sed esse
            mollitia officiis dicta at, ipsum ullam laboriosam iure.
          </p>
        </aside>
        <section className="flex-2 bg-amber-200">
          <nav className="flex  gap-2 p-2">
            <Link to="/" className="[&.active]:font-bold ">
              Repositories
            </Link>{" "}
            <Link to="/starred" className="[&.active]:font-bold">
              Starred
            </Link>
          </nav>
          <Outlet />
        </section>
      </MainLayout>
    </>
  );
}
