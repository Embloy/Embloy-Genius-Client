export const cast_date = (args, format_code) => {
    const date = new Date(args);
    let formattedDate = "";
  
    switch (format_code.toLowerCase()) {
      case "us":
        formattedDate = date.toLocaleDateString("en-US");
        break;
      case "uk":
        formattedDate = date.toLocaleDateString("en-GB");
        break;
      case "iso":
        formattedDate = date.toISOString();
        break;
      case "de":
        formattedDate = date.toLocaleDateString("de-DE");
        break;
      case "time-us":
        formattedDate = date.toLocaleTimeString("en-US");
        break;
      case "time-uk":
        formattedDate = date.toLocaleTimeString("en-GB");
        break;
      case "time-de":
        formattedDate = date.toLocaleTimeString("de-DE");
        break;
      default:
        formattedDate = args;
        break;
    }
  
    return formattedDate;
  };

export const cast_date_no_null = (args, format_code='us') => {
  let date = cast_date(args, format_code);
  if (date === "Invalid Date") {
      date = "#FORMAT_ERROR";
  } else if (args === null) {
      date = null;
  }
  return date;
}

export const capitalize = (str) => {
  if (!str) return str; 
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const slug_to_host = (slug, defaultHost) => {
  let bin = slug.split('__');
  
  let res = defaultHost
  if (defaultHost === undefined) {
    res = ""
  }
  if (bin.length > 1) {
    res = bin[0][0] + bin[0].slice(1)
  }
  return res;
}

export const job_slug_to_host = (slug, defaultHost="Embloy") => { 
  let res = slug_to_host(slug, defaultHost);
  return capitalize(res);
}