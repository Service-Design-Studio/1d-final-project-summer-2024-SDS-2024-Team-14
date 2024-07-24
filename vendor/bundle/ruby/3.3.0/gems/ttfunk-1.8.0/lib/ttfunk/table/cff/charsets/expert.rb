# frozen_string_literal: true

module TTFunk
  class Table
    class Cff < TTFunk::Table
      module Charsets
        # Predefinde CFF Expert charset
        EXPERT = OneBasedArray.new(
          [
            'space',
            *[nil] * 11,
            'comma',
            'hyphen',
            'period',
            *[nil] * 11,
            'colon',
            'semicolon',
            *[nil] * 70,
            'fraction',
            *[nil] * 9,
            'fi',
            'fl',
            *[nil] * 39,
            'onesuperior',
            *[nil] * 4,
            'onehalf',
            nil,
            nil,
            'onequarter',
            *[nil] * 4,
            'threequarters',
            'twosuperior',
            *[nil] * 4,
            'threesuperior',
            *[nil] * 59,
            'exclamsmall',
            'Hungarumlautsmall',
            'dollaroldstyle',
            'dollarsuperior',
            'ampersandsmall',
            'Acutesmall',
            'parenleftsuperior',
            'parenrightsuperior',
            'twodotenleader',
            'onedotenleader',
            'zerooldstyle',
            'oneoldstyle',
            'twooldstyle',
            'threeoldstyle',
            'fouroldstyle',
            'fiveoldstyle',
            'sixoldstyle',
            'sevenoldstyle',
            'eightoldstyle',
            'nineoldstyle',
            'commasuperior',
            'threequartersemdash',
            'periodsuperior',
            'questionsmall',
            'asuperior',
            'bsuperior',
            'centsuperior',
            'dsuperior',
            'esuperior',
            'isuperior',
            'lsuperior',
            'msuperior',
            'nsuperior',
            'osuperior',
            'rsuperior',
            'ssuperior',
            'tsuperior',
            'ff',
            'ffi',
            'ffl',
            'parenleftinferior',
            'parenrightinferior',
            'Circumflexsmall',
            'hyphensuperior',
            'Gravesmall',
            'Asmall',
            'Bsmall',
            'Csmall',
            'Dsmall',
            'Esmall',
            'Fsmall',
            'Gsmall',
            'Hsmall',
            'Ismall',
            'Jsmall',
            'Ksmall',
            'Lsmall',
            'Msmall',
            'Nsmall',
            'Osmall',
            'Psmall',
            'Qsmall',
            'Rsmall',
            'Ssmall',
            'Tsmall',
            'Usmall',
            'Vsmall',
            'Wsmall',
            'Xsmall',
            'Ysmall',
            'Zsmall',
            'colonmonetary',
            'onefitted',
            'rupiah',
            'Tildesmall',
            'exclamdownsmall',
            'centoldstyle',
            'Lslashsmall',
            'Scaronsmall',
            'Zcaronsmall',
            'Dieresissmall',
            'Brevesmall',
            'Caronsmall',
            'Dotaccentsmall',
            'Macronsmall',
            'figuredash',
            'hypheninferior',
            'Ogoneksmall',
            'Ringsmall',
            'Cedillasmall',
            'questiondownsmall',
            'oneeighth',
            'threeeighths',
            'fiveeighths',
            'seveneighths',
            'onethird',
            'twothirds',
            'zerosuperior',
            'foursuperior',
            'fivesuperior',
            'sixsuperior',
            'sevensuperior',
            'eightsuperior',
            'ninesuperior',
            'zeroinferior',
            'oneinferior',
            'twoinferior',
            'threeinferior',
            'fourinferior',
            'fiveinferior',
            'sixinferior',
            'seveninferior',
            'eightinferior',
            'nineinferior',
            'centinferior',
            'dollarinferior',
            'periodinferior',
            'commainferior',
            'Agravesmall',
            'Aacutesmall',
            'Acircumflexsmall',
            'Atildesmall',
            'Adieresissmall',
            'Aringsmall',
            'AEsmall',
            'Ccedillasmall',
            'Egravesmall',
            'Eacutesmall',
            'Ecircumflexsmall',
            'Edieresissmall',
            'Igravesmall',
            'Iacutesmall',
            'Icircumflexsmall',
            'Idieresissmall',
            'Ethsmall',
            'Ntildesmall',
            'Ogravesmall',
            'Oacutesmall',
            'Ocircumflexsmall',
            'Otildesmall',
            'Odieresissmall',
            'OEsmall',
            'Oslashsmall',
            'Ugravesmall',
            'Uacutesmall',
            'Ucircumflexsmall',
            'Udieresissmall',
            'Yacutesmall',
            'Thornsmall',
          ],
        ).freeze
      end
    end
  end
end
