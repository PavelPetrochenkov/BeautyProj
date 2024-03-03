import { Button, Image, Stack, Text } from 'tamagui';
import { Typography } from './Typography';

type CardProps = {
  onPressCreatePhoto: () => void;
  date: number;
  uri: string;
  label: string;
};

export const Card = ({ onPressCreatePhoto, date, uri, label }: CardProps) => {
  return (
    <Stack alignItems='center'>
      <Typography variant='lg'>{label}</Typography>
      {date ? (
        <Typography variant='md'>{new Date(date).toUTCString()}</Typography>
      ) : null}
      <Stack>
        {uri ? (
          <Image
            style={[{ width: 350, height: 350 }]}
            source={{ uri: uri }}
            resizeMode='contain'
          />
        ) : (
          <Button backgroundColor='$primary' onPress={onPressCreatePhoto}>
            <Typography variant='md' color='$card'>
              Create Photo
            </Typography>
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
