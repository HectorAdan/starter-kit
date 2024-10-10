import {
  Viro360Image,
  Viro3DObject,
  ViroAmbientLight,
  ViroARPlaneSelector,
  ViroARScene,
  ViroARSceneNavigator,
  ViroPortal,
  ViroPortalScene,
} from "@reactvision/react-viro";

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PortalScene = () => {
  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" intensity={200} />
      <ViroPortalScene
        passable={true}
        dragType="FixedDistance"
        onDrag={() => {}}
      >
        <ViroPortal
          position={[0, 0, -0.2]}
          scale={[0.1, 0.1, 0.1]}
          rotation={[0, 0, 0]}
        >
          <Viro3DObject
            source={require("./res/portal/portal.vrx")}
            resources={[
              require("./res/portal/portal_ship_diffuse.png"),
              require("./res/portal/portal_ship_normal.png"),
              require("./res/portal/portal_ship_specular.png"),
            ]}
            type="VRX"
          />
        </ViroPortal>
        <Viro360Image source={require("./res/portal/360_space.jpg")} />
        {/* <Viro360Video
          source={require("./res/portal/portal_video.mp4")}
          loop={true}
        /> */}
      </ViroPortalScene>
    </ViroARScene>
  );
};

export default () => {
  const refNavigator = React.useRef<ViroARSceneNavigator>(null);

  const objects = [
    {
      id: 1,
      name: "Dining Table",
      source: require("./res/dining_table/dining_table.glb"),
      imgSource: require("./res/dining_table/dining_table.png"),
    },
    {
      id: 2,
      name: "Mesa de centro",
      source: require("./res/mesa_centro/mesa_centro.glb"),
      imgSource: require("./res/mesa_centro/mesa_centro.png"),
    },
    {
      id: 3,
      name: "Pixar lamp",
      source: require("./res/pixar_lamp/pixar_lamp.glb"),
      imgSource: require("./res/pixar_lamp/pixar_lamp.png"),
    },
    {
      id: 4,
      name: "Silla Madera",
      source: require("./res/silla_madera/silla_madera.glb"),
      imgSource: require("./res/silla_madera/silla_madera.png"),
    },
    {
      id: 5,
      name: "Mario",
      source: require("./res/mario/mario.glb"),
      imgSource: require("./res/mario/mario.png"),
    },
  ];

  const portals = [
    {
      id: 1,
      name: "Image",
      source: require("./res/portal/portal.vrx"),
      imgSource: require("./res/portal/portal.png"),
    },
  ];

  const [selectedModel, setSelectedModel] = useState(objects[0]);
  const [selectedPortal, setSelectedPortal] = useState(portals[0]);
  const [mode, setMode] = useState(1);
  const [loading, setLoading] = useState(false);
  console.log(mode);

  useEffect(() => {
    if (loading === true) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={100} color="red" />
          <Text style={{ fontSize: 18 }}> Loading...</Text>
        </View>
      ) : (
        <ViroARSceneNavigator
          ref={refNavigator}
          key={mode === 1 ? 1 : 2}
          initialScene={{
            // eslint-disable-next-line react/no-unstable-nested-components
            scene: () =>
              mode === 1 ? (
                <ViroARScene key={selectedModel.id}>
                  <ViroARPlaneSelector>
                    <Viro3DObject
                      source={selectedModel.source}
                      position={[0, 0, 0]}
                      scale={[1, 1, 1]}
                      type={"GLB"}
                      dragType="FixedDistance"
                    />
                    <ViroAmbientLight color="#FFFFFF" />
                    {/* <ViroQuad
                      rotation={[-90, 0, 0]}
                      position={[0, -0.5, 0]}
                      width={500}
                      height={500}
                      arShadowReceiver={true}
                      lightReceivingBitMask={4}
                    /> */}
                  </ViroARPlaneSelector>
                </ViroARScene>
              ) : (
                <PortalScene />
              ),
          }}
          style={styles.f1}
        />
      )}

      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Button
            title="3D objects"
            color={mode === 1 ? "red" : "gray"}
            onPress={() => {
              setLoading(true);
              setMode(1);
            }}
          />
          <Button
            title="Portals"
            color={mode === 2 ? "red" : "gray"}
            onPress={() => {
              setLoading(true);
              setMode(2);
            }}
          />
        </View>
        {mode === 1 ? (
          <ScrollView contentContainerStyle={styles.scrollContainer} horizontal>
            {objects.map((object) => {
              return (
                <View key={object.id} style={styles.objectContainer}>
                  <Text style={{ color: "white" }}>{object.name}</Text>
                  <TouchableOpacity
                    style={[
                      styles.objectPreview,
                      object.id === selectedModel.id && styles.selectedObject,
                    ]}
                    onPress={() => {
                      setSelectedModel(object);
                      setLoading(true);
                    }}
                  >
                    <Image source={object.imgSource} style={[styles.image]} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        ) : mode === 2 ? (
          <ScrollView contentContainerStyle={styles.scrollContainer} horizontal>
            {portals.map((object) => {
              return (
                <View key={object.id} style={styles.objectContainer}>
                  <Text style={{ color: "white" }}>{object.name}</Text>
                  <TouchableOpacity
                    style={[
                      styles.objectPreview,
                      object.id === selectedPortal.id && styles.selectedObject,
                    ]}
                    onPress={() => {
                      setSelectedPortal(object);
                    }}
                  >
                    <Image source={object.imgSource} style={[styles.image]} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        ) : null}
      </View>
    </>
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 28,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
  container: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    opacity: 0.6,
    backgroundColor: "black",
    paddingVertical: 10,
    gap: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    flexDirection: "row",
    columnGap: 10,
    padding: 0,
  },
  objectContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  objectPreview: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 100,
    overflow: "hidden",
  },
  selectedObject: {
    borderColor: "red",
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
