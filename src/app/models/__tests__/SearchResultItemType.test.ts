import {
  RemoteSearchResultItem,
  SearchResultItemType,
} from "../SearchResultItemType";

it("converts the remote type to local", () => {
  const remote: RemoteSearchResultItem = {
    name: "Melbourne",
    local_names: {
      en: "Melbourne",
      ko: "멜버른",
      pt: "Melbourne",
      hi: "मेलबॉर्न",
      it: "Melbourne",
      he: "מלבורן",
      lt: "Melburnas",
      bg: "Мелбърн",
      ja: "メルボルン",
      sr: "Мелбурн",
      mr: "मेलबर्न",
      sv: "Melbourne",
      oc: "Melbourne",
      ru: "Мельбурн",
      fi: "Melbourne",
      kn: "ಮೆಲ್ಬೋರ್ನ್",
      is: "Melbourne",
      mi: "Poipiripi",
      mk: "Мелбурн",
      el: "Μελβούρνη",
      fr: "Melbourne",
      ar: "ملبورن",
      uk: "Мельбурн",
      zh: "墨爾本",
      pl: "Melbourne",
      es: "Melbourne",
      eo: "Melburno",
      de: "Melbourne",
    },
    lat: -37.8142454,
    lon: 144.9631732,
    country: "AU",
    state: "Victoria",
  };

  const model = new SearchResultItemType(remote);
  expect(model.city).toBe(remote.name);
  expect(model.state).toBe(remote.state);
  expect(model.country).toBe(model.country);
});
