import bigInteger from "big-integer";
import { Dec } from "./decimal";

export class Int {
  // (2 ** 256) - 1
  protected static maxInt = bigInteger(
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  );

  protected int: bigInteger.BigInteger;

  /**
   * @param int - Parse a number | bigInteger | string into a bigInt.
   * Remaing parameters only will be used when type of int is string.
   * @param base - Default base is 10.
   * @param alphabet - Default alphabet is "0123456789abcdefghijklmnopqrstuvwxyz".
   * @param caseSensitive - Defaults to false.
   */
  constructor(
    int: bigInteger.BigNumber,
    base?: bigInteger.BigNumber,
    alphabet?: string,
    caseSensitive?: boolean
  ) {
    if (typeof int === "string") {
      if (int.indexOf(".") >= 0) {
        throw new Error(`${int} is not integer`);
      }

      this.int = bigInteger(int, base, alphabet, caseSensitive);
    } else if (typeof int === "number") {
      this.int = bigInteger(int);
    } else if (typeof int === "bigint") {
      this.int = bigInteger(int);
    } else {
      this.int = bigInteger(int);
    }

    this.checkBitLen();
  }

  protected checkBitLen(): void {
    if (this.int.abs().gt(Int.maxInt)) {
      throw new Error(`Integer out of range ${this.int.toString()}`);
    }
  }

  public toString(): string {
    return this.int.toString(10);
  }

  public isNegative(): boolean {
    return this.int.isNegative();
  }

  public isPositive(): boolean {
    return this.int.isPositive();
  }

  public isZero(): boolean {
    return this.int.eq(bigInteger(0));
  }

  public equals(i: Int): boolean {
    return this.int.equals(i.int);
  }

  public gt(i: Int): boolean {
    return this.int.gt(i.int);
  }

  public gte(i: Int): boolean {
    return this.int.greaterOrEquals(i.int);
  }

  public lt(i: Int): boolean {
    return this.int.lt(i.int);
  }

  public lte(i: Int): boolean {
    return this.int.lesserOrEquals(i.int);
  }

  public abs(): Int {
    return new Int(this.int.abs());
  }

  public absUInt(): Uint {
    return new Uint(this.int.abs());
  }

  public add(i: Int): Int {
    return new Int(this.int.add(i.int));
  }

  public sub(i: Int): Int {
    return new Int(this.int.subtract(i.int));
  }

  public mul(i: Int): Int {
    return new Int(this.int.multiply(i.int));
  }

  public div(i: Int): Int {
    return new Int(this.int.divide(i.int));
  }

  public mod(i: Int): Int {
    return new Int(this.int.mod(i.int));
  }

  public neg(): Int {
    return new Int(this.int.negate());
  }

  public pow(i: Uint): Int {
    return new Int(this.int.pow(i.toBigNumber()));
  }

  public toDec(): Dec {
    return new Dec(this);
  }

  public toBigNumber(): bigInteger.BigInteger {
    return this.int;
  }
}

export class Uint {
  protected uint: bigInteger.BigInteger;

  /**
   * @param uint - Parse a number | bigInteger | string into a bigUint.
   * Remaing parameters only will be used when type of int is string.
   * @param base - Default base is 10.
   * @param alphabet - Default alphabet is "0123456789abcdefghijklmnopqrstuvwxyz".
   * @param caseSensitive - Defaults to false.
   */
  constructor(
    uint: bigInteger.BigNumber,
    base?: bigInteger.BigNumber,
    alphabet?: string,
    caseSensitive?: boolean
  ) {
    if (typeof uint === "string") {
      if (uint.indexOf(".") >= 0) {
        throw new Error(`${uint} is not integer`);
      }

      this.uint = bigInteger(uint, base, alphabet, caseSensitive);
    } else if (typeof uint === "number") {
      this.uint = bigInteger(uint);
    } else if (typeof uint === "bigint") {
      this.uint = bigInteger(uint);
    } else {
      this.uint = bigInteger(uint);
    }

    if (this.uint.isNegative()) {
      throw new TypeError("Uint should not be negative");
    }

    this.checkBitLen();
  }

  protected checkBitLen(): void {
    if (this.uint.abs().bitLength().gt(256)) {
      throw new Error(`Integer out of range ${this.uint.toString()}`);
    }
  }

  public toString(): string {
    return this.uint.toString(10);
  }

  public isZero(): boolean {
    return this.uint.eq(bigInteger(0));
  }

  public equals(i: Uint): boolean {
    return this.uint.equals(i.uint);
  }

  public gt(i: Uint): boolean {
    return this.uint.gt(i.uint);
  }

  public gte(i: Uint): boolean {
    return this.uint.greaterOrEquals(i.uint);
  }

  public lt(i: Uint): boolean {
    return this.uint.lt(i.uint);
  }

  public lte(i: Uint): boolean {
    return this.uint.lesserOrEquals(i.uint);
  }

  public add(i: Uint): Uint {
    return new Uint(this.uint.add(i.uint));
  }

  public sub(i: Uint): Uint {
    return new Uint(this.uint.subtract(i.uint));
  }

  public mul(i: Uint): Uint {
    return new Uint(this.uint.multiply(i.uint));
  }

  public div(i: Uint): Uint {
    return new Uint(this.uint.divide(i.uint));
  }

  public mod(i: Uint): Uint {
    return new Uint(this.uint.mod(i.uint));
  }

  public pow(i: Uint): Uint {
    return new Uint(this.uint.pow(i.toBigNumber()));
  }

  public toDec(): Dec {
    return new Dec(new Int(this.toString()));
  }

  public toBigNumber(): bigInteger.BigInteger {
    return this.uint;
  }
}
