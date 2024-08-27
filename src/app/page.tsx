import Image from "next/image";

import SearchForm from "@/components/SearchForm";

import "./homePage.css";

const tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const tomorrowDateFormatted = tomorrowDate.toISOString().substring(0, 10);

const Home = () => {
  return (
    <main className="main">
      <SearchForm />

      <div className="existingSearch">
        Or try with an existing search{" "}
        <a
          href={`/search?fc=48.864716,2.349014&tc=45.750000,4.850000&db=${tomorrowDateFormatted}`}
          className="existingSearchLink"
        >
          <span>Paris to Lyon tomorrow</span>

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
