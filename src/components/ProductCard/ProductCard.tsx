import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
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
          uri: "https://i.pravatar.cc/150?img=47",
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
    margin: 10,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  sideStrip: {
    width: 6,
    height: "100%",
    backgroundColor: "#B273D9",
    marginRight: 10,
    borderRadius: 6,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 40,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  categoryBadge: {
    backgroundColor: "#B273D9",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
  },
  price: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  stock: {
    fontSize: 12,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    backgroundColor: "#B273D9",
    borderRadius: 8,
    padding: 8,
    marginLeft: 6,
  },
});
