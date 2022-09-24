import { useState } from 'react';

import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import { MaterialIcons } from "@expo/vector-icons";
import CheckCircle from "../../assets/check-circle.svg";

import * as Clipboard from "expo-clipboard";

import {Heading} from "../Heading";

import { styles } from './styles';
import { THEME } from '../../theme';

interface Props extends ModalProps {
  discord: string,
  onClose: () => void,
}

export function DuoMatch({discord, onClose, ...rest}: Props) {
  const [isCopying, setIsCopying] = useState(false);
  
  async function handleCopyDiscordUserToClipboard() {
    setIsCopying(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert("Copiado!", "O usuário do Discord foi copiado para a área de transferência.");
    setIsCopying(false);
  }

  return (
    <Modal 
    animationType="fade"
    transparent 
    statusBarTranslucent 
    {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
          </TouchableOpacity>
          <CheckCircle width={64} height={100} />
          <Heading 
          title="Let's play!" 
          subtitle="Agora é só começar a jogar!"
          style={{alignItems: 'center'}}
          />
          <Text style={styles.label}>Adicione no Discord</Text>
          <TouchableOpacity 
          style={styles.discordButton}
          onPress={handleCopyDiscordUserToClipboard}
          disabled={isCopying}
          >
            <Text style={styles.discord}>{isCopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}