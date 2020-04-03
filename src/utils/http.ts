export const assertOkResponse = async (response: Response) => {
  if (response.status >= 400) {
      let text: string;
      try {
          text = (await response.json()).msg
      } catch (e) {
          text = await response.text()
      }
      throw new Error(text)
  }
};