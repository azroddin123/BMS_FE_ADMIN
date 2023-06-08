export default (string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "INR" }).format(
    Number(string)
  );
