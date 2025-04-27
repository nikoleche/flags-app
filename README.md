## Summary

flags-app is a simple application based on HTML, CSS, and JavaScript. The application makes calls to the REST Countries API and saves the flags of visited countries. After that, it calculates the amount of countries visited.

## Initial Setup

To use the application, download the repository, go to the root folder and access index.html in the browser. Or use Live Server in Visual Studio Code.

A live demo is also available at:

`https://webstoner.com/flags-app`

## API

This application makes calls to the REST Countries external API.

### **Endpoint**

`https://restcountries.com/v3.1/name/${countryName}`

### **Method**

`GET`

## **URL Parameter**

`${countryName} returns a JSON with the data of the country inserted in the input field.`

## **Features**

<ul>
<li>Search for country flags using the REST Countries API</li>
<li>Error handling for invalid, blank, or duplicate inputs, as well as API response errors</li>
<li>Reset button to clear previous results and start a new search</li>
</ul>
