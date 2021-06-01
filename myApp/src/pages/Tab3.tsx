import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import React, { useState } from 'react';

// Query for the toggle that is used to change between themes
const toggle = document.querySelector('#themeToggle');

// Listen for the toggle check/uncheck to toggle the dark class on the <body>
toggle.addEventListener('ionChange', (ev) => {
  document.body.classList.toggle('dark', ev.detail.checked);
});

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Listen for changes to the prefers-color-scheme media query
prefersDark.addListener((e) => checkToggle(e.matches));

// Called when the app loads
function loadApp() {
  checkToggle(prefersDark.matches);
}

// Called by the media query to check/uncheck the toggle
function checkToggle(shouldCheck) {
  toggle.checked = shouldCheck;
}

const Tab3: React.FC = () => {
  const [checked, setChecked] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
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
          <IonToggle checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
        </IonItem>


      </IonContent>
    </IonPage>
  );
};

export default Tab3;
