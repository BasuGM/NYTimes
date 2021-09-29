import * as React from 'react';
import {View, Text} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const TestScreen = () => (
  <View style={[]}>
    <Card>
      <Card.Content>
        <Title>How Covid Misinformation Created a Run on Animal Medicine</Title>
      </Card.Content>
      <Card.Title
        title="By Erin Woo"
        subtitle="Published: 2021-09-28T05:00:22-04:00"
        left={LeftContent}
      />
      <View style={{width: '100%', alignItems: 'center'}}>
        <Card.Cover
          style={{width: '95%'}}
          source={{uri: 'https://picsum.photos/700'}}
        />
      </View>
      <Card.Content>
        <Paragraph>
          Veterinarians, ranchers and farmers say they are struggling with the
          effects of the surging demand for ivermectin, a deworming drug.
        </Paragraph>
      </Card.Content>
      {/* <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions> */}
    </Card>

    <Card>
      {/* <Card.Title
      title="Card Title"
      subtitle="Card Subtitle"
      left={LeftContent}
    /> */}
      <Card.Content>
        <Title>How Covid Misinformation Created a Run on Animal Medicine</Title>
        <Paragraph>
          Veterinarians, ranchers and farmers say they are struggling with the
          effects of the surging demand for ivermectin, a deworming drug.
        </Paragraph>
      </Card.Content>
      <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      {/* <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions> */}
    </Card>
  </View>
);

export default TestScreen;
