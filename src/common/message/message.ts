/**
 * This messaging system is influenced by cosmos-sdk.
 * The messages are processed in the following order:
 * "deserialze message -> approve external -> validate basic -> handler by routing".
 * This deserializing system has weak polymorphism feature.
 * Message would be converted to object according to their class and registered type.
 * But, nested class is not supported. Non primitivie types or array that includes non primitive types in message's fields
 * can't be decoded to their type properly. In this case, user should set thier prototype manually.
 */
export abstract class Message<R> {
  /**
   * It is needed to infer the type of result from messaging in order to use message with easy and safe type checking.
   * However, typescript doesn't infer the type of result if generic R is not used in structure due to its structural typing system.
   * So, we need to use generic R though there is no need to use generic R in structure.
   * This is just dummy field for generic R, and actually it is never used.
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  private resultType: R;

  abstract validateBasic(): void;
  abstract route(): string;
  abstract type(): string;
  /**
   * Ask for approval if message is sent externally.
   */
  approveExternal(sender: chrome.runtime.MessageSender): boolean {
    if (!sender.url) {
      return false;
    }
    const url = new URL(sender.url);
    if (url.origin !== `chrome-extension://${chrome.runtime.id}`) {
      return false;
    }
    return sender.id === chrome.runtime.id;
  }
}