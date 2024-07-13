import { EnumPixKeyType } from '../../../database/schemas/pixkey';
export async function pixkeyValidate(type: string, pixkey: string) {

    let pixkeyValid = true;    
    let pixkeyFormated = pixkey.split(/\s+/).join('').toLowerCase();
    
    switch (type) {
      case EnumPixKeyType.CPF:
        pixkeyFormated = pixkey.replace(/\D+/g, '');

        if (pixkeyFormated.length !== 11) {
          pixkeyValid = false;
        }
        break;

      case EnumPixKeyType.CNPJ:
        pixkeyFormated = pixkey.replace(/\D+/g, '');

        if (pixkeyFormated.length !== 14) {
          pixkeyValid = false;
        }
        break;          

      case EnumPixKeyType.EMAIL:
        if (!pixkeyFormated.includes('@')) {
          pixkeyValid = false;
        }

        if (pixkeyFormated.startsWith('@')) {
          pixkeyValid = false;
        }

        if (pixkeyFormated.length > 100) {
          pixkeyValid = false;
        }
        break;

      case EnumPixKeyType.PHONE:
        if (!pixkeyFormated.includes(`+55`)) {
          pixkeyFormated = `+55${pixkey}`;
        }

        if (pixkeyFormated.length !== 14) {
          pixkeyValid = false;
        }
        break;

      case EnumPixKeyType.EVP:
        if (pixkeyFormated.length !== 36) {
          pixkeyValid = false;
        }
        break;

      default:
        break;
    }

    return { pixkeyFormated, pixkeyValid };
  }

