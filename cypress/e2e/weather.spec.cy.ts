import searchResults from "../fixtures/search-result.json";

describe("weather application", () => {
  it("displays the application title", () => {
    cy.intercept("GET", "https://api.openweathermap.org/geo/1.0/direct?q=*", {
      status: 200,
      body: searchResults,
    });
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="search-input"]').type("Melbourne");
    cy.get('[data-testid="search-input"]').type("{enter}");
    cy.get('[data-testid="search-results"] .search-result').should(
      "have.length",
      5
    );
  });

  it("adds city to favorite list", () => {
    cy.intercept("GET", "https://api.openweathermap.org/geo/1.0/direct?q=*", {
      status: 200,
      body: searchResults,
    });
    cy.intercept("GET", "https://api.openweathermap.org/data/2.5/weather*", {
      fixture: "melbourne.json",
    }).as("getWeather");

    cy.visit("http://localhost:3000/");

    // simulates typing Melbourne and hitting the 'Enter' key
    cy.get('[data-testid="search-input"]').type("Melbourne");
    cy.get('[data-testid="search-input"]').type("{enter}");

    // clicks on the first result
    cy.get('[data-testid="search-results"] .search-result').first().click();

    // checks if favorite cities list contains a city element with Melbourne and 10.78 degrees celsius
    cy.get('[data-testid="favorite-cities"] .city').should("have.length", 1);
    cy.get(
      '[data-testid="favorite-cities"] .city:contains("Melbourne")'
    ).should("exist");
    cy.get('[data-testid="favorite-cities"] .city:contains("11°C")').should(
      "exist"
    );
  });
});
