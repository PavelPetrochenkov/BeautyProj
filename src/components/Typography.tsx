import React, { forwardRef } from 'react';
import { GetProps, styled, TamaguiTextElement, Text } from 'tamagui';

const TypographyBase = styled(Text, {
  color: '$textDefault',
  variants: {
    variant: {
      md: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22,
      },
      lg: {
        fontSize: 22,
        fontWeight: '800',
        lineHeight: 30,
      },
    },
  } as const,
});

export type TypographyProps = GetProps<typeof TypographyBase>;

export const Typography = forwardRef(
  (props: TypographyProps, ref?: React.Ref<TamaguiTextElement>) => (
    <TypographyBase ref={ref} {...props} />
  )
);
