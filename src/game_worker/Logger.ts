const Logger = {
  logErrors: (label: string, errors: string[]) => {
    console.group(label);
    errors.forEach(console.error);
    console.groupEnd();
  },
};

export { Logger };
