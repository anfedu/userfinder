export function findUser(input, arr) {
  try {
    return arr.filter((data) => {
      const regex = new RegExp(input, "gi");
      if (!isNaN(parseInt(input)) || null) {
        const i = data.id.toString();
        console.log(i.match(input));
      } else {
        if (data.name.match(regex) != null && input.length > 1) {
          return data;
        }
      }
    });
  } catch (e) {
    return false;
  }
}
