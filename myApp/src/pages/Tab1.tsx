import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRippleEffect, IonTitle, IonToolbar } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import { star } from 'ionicons/icons';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/*<ExploreContainer name="Tab 1 page" />*/}

        {/*-- Label --*/}
        <IonItem>
          <IonLabel>
            Goodmorning, George
          </IonLabel>
        </IonItem>

        <div //Center our big START button
          className="ion-activatable ripple-parent"
          style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
          <IonButton routerLink="/tab2">
            START
            <IonIcon slot="icon-only" icon={star} />
            <IonRippleEffect type="unbounded"></IonRippleEffect>
          </IonButton>
         
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
