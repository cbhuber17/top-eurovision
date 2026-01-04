import "./App.css";
import Header from "./components/Header/Header";
import PersonCard from "./components/PersonCard/PersonCard";
import { eurovisionTop10ByPerson } from "./data/eurovisionTop10";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <div className="app">
      <div className="container">
        <Header />

        <main className="cards-grid">
          {eurovisionTop10ByPerson.map((person) => (
            <PersonCard
              key={person.personName}
              personName={person.personName}
              top10={person.top10}
            />
          ))}
        </main>
        <Footer />
      </div>
    </div>
  );
}
