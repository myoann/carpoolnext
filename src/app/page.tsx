import Image from "next/image";
import SearchForm from "@/components/SearchForm";

import "./homePage.css";

const todayDate = new Date().toISOString().substring(0, 10);

const Home = () => {
  return (
    <main className="main">
      <SearchForm />

      <div className="existingSearch">
        Or try with an existing search:
        <a
          href={`/search?fc=48.864716,2.349014&tc=51.509865,-0.118092&db=${todayDate}`}
          className="existingSearchLink"
        >
          <span>Paris to London today</span>

          <Image
            src="/search.svg"
            alt="Search"
            width={24}
            height={24}
            className="searchIcon"
          />
        </a>
      </div>
    </main>
  );
};

export default Home;
