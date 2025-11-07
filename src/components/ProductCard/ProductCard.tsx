import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { moderateScale } from "../../utils/scalingUtils";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";
import { Editicon } from "../../assets/icons/editicon";

type ProductCardProps = {
  title: string;
  price: number;
  category: string;
  stock: number;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const ProductCard = ({
  title,
  price,
  category,
  stock,
  onEdit,
  onDelete,
}: ProductCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.sideStrip} />

      <Image
        source={{
          uri: "https://media.istockphoto.com/id/1439393584/vector/3d-document-list-with-question-mark-icon-paper-document-sheet-missing-with-speech-bubble.jpg?s=612x612&w=0&k=20&c=ieSNO3a3BfpKAfdveaOp9-RIHj7PxqHZINmxE6QdRLc=",
        }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>

        <Text style={styles.price}>${price}</Text>
        <Text style={styles.stock}>{stock} in stock</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconBtn} onPress={onEdit}>
          <Editicon />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn} onPress={onDelete}>
          <DeleteIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: moderateScale(10),
    padding: moderateScale(10),
    borderRadius: moderateScale(12),
    alignItems: "center",
    elevation: 3,
  },
  sideStrip: {
    width: moderateScale(6),
    height: "100%",
    backgroundColor: "#B273D9",
    marginRight: moderateScale(10),
    borderRadius: moderateScale(6),
  },
  image: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(30),
  },
  info: {
    flex: 1,
    marginLeft: moderateScale(12),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: "700",
    color: "#111",
  },
  categoryBadge: {
    backgroundColor: "#B273D9",
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(6),
    marginTop: moderateScale(4),
    alignSelf: "flex-start",
  },
  categoryText: {
    color: "#fff",
    fontSize: moderateScale(12),
  },
  price: {
    marginTop: moderateScale(8),
    fontWeight: "bold",
    fontSize: moderateScale(16),
    color: "#111",
  },
  stock: {
    fontSize: moderateScale(12),
    color: "#555",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    backgroundColor: "#B273D9",
    borderRadius: moderateScale(8),
    padding: moderateScale(8),
    marginLeft: moderateScale(6),
  },
});
