import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import React, { useState } from 'react';
import { enableDarkTheme } from '../helpers/utils'

const Tab3: React.FC = () => {
  const [checked, setChecked] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem>
          <IonLabel>Checked: {JSON.stringify(checked)}</IonLabel>
          <IonToggle checked={checked} onIonChange={toggleDarkModeHandler} />
        </IonItem>


      </IonContent>
    </IonPage>
  );
};

const toggleDarkModeHandler = () => {
  //e => setChecked(e.detail.checked)
  document.body.classList.toggle("dark");
};

export default Tab3;