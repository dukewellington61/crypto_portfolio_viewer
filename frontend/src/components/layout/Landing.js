import React, { Fragment, useState, useEffect } from "react";
import { getMarketChartsCrypto } from "../../actions/currencies";
import { getCurrenciesNames } from "../../aux/auxCryptoData";
import Overview from "../portfolio/Overview";
import TotalChart from "../portfolio/TotalChart";

function Landing({ user, cryptoCurrencies, logedin, triggerAlert }) {
  const [renderOverview, setRenderOverview] = useState(true);
  const [renderTotalChart, setRenderTotalChart] = useState(false);

  const toggleView = () => {
    if (renderOverview) {
      setRenderOverview(false);
      setRenderTotalChart(true);
      return;
    } else {
      setRenderOverview(true);
      setRenderTotalChart(false);
    }
  };

  const [origin, setOrigin] = useState();

  const updateOriginState = (val) => setOrigin(val);

  const [marketCharts, setMarketCharts] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState("all_total");

  useEffect(() => {
    let currenciesObject = {};
    const currencyNamesArr = getCurrenciesNames(user);

    currencyNamesArr.forEach(async (currencyName) => {
      const res = await getMarketChartsCrypto(
        user,
        currencyName,
        marketCharts.current_price,
        duration
      );
      if (res instanceof Error) {
        // triggerAlert("an error has occured while loading data");
        triggerAlert(res.response.data);
        // this makes sure that currenciesObject only gets attributes if no error occurs so those attributes are proper arrays
        // otherwhise attributes are non iterable error objects -> a arr.forEach() will throw an exception and break the app
        // if api returns errors currenciesObject (and therefore marketCharts) remains an empty object which merely results in
        // an empty chart
      } else currenciesObject[currencyName] = res;
    });

    setMarketCharts(currenciesObject);
    setLoaded(true);
  }, [user, cryptoCurrencies, logedin]);

  return (
    <Fragment>
      {renderOverview && (
        <Overview
          user={user}
          cryptoCurrencies={cryptoCurrencies}
          logedin={logedin}
          toggleView={toggleView}
          renderOverview={renderOverview}
          updateOriginState={updateOriginState}
        />
      )}
      {renderTotalChart && (
        <TotalChart
          user={user}
          marketCharts={marketCharts}
          cryptoCurrencies={cryptoCurrencies}
          logedin={logedin}
          triggerAlert={triggerAlert}
          toggleView={toggleView}
          origin={origin}
          loaded={loaded}
          duration={duration}
        />
      )}
    </Fragment>
  );
}

export default Landing;
