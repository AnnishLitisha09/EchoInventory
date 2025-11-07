import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { moderateScale } from "../../utils/scalingUtils";
import { CurvedHeader } from "../../components/CurvedHeader/CurvedHeader";
import api from "../../utils/api"; // axios instance

export const AddProductScreen = ({ navigation, route }) => {
  const mode = route?.params?.mode || "add"; // "add" or "edit"
  const editData = route?.params?.product || null;

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // Pre-fill fields if editing
  useEffect(() => {
    if (mode === "edit" && editData) {
      setProductName(editData.name);
      setCategory(editData.category);
      setPrice(String(editData.price));
      setStock(String(editData.stock));
    }
  }, [mode, editData]);

  const handleSubmit = async () => {
    // Validate inputs
    if (!productName.trim() || !category.trim() || !price || !stock) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const payload = {
      name: productName.trim(),
      category: category.trim(),
      price: Number(price),
      stock: Number(stock),
    };

    try {
      if (mode === "add") {
        await api.post("/products", payload);
        Alert.alert("Success", "Product added successfully!");
      } else {
        await api.put(`/products/${editData.id}`, payload);
        Alert.alert("Success", "Product updated successfully!");
      }

      navigation.goBack();
    } catch (error) {
      console.log("API Error:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to save product. Check console for details.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CurvedHeader
        title={mode === "add" ? "Add New Product" : "Edit Product"}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Product Name */}
        <Text style={styles.label}>Product Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter product name"
            style={styles.input}
            placeholderTextColor="#A4A8AE"
            value={productName}
            onChangeText={setProductName}
          />
        </View>

        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter category"
            style={styles.input}
            placeholderTextColor="#A4A8AE"
            value={category}
            onChangeText={setCategory}
          />
        </View>

        {/* Price */}
        <Text style={styles.label}>Price</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter price"
            style={styles.input}
            placeholderTextColor="#A4A8AE"
            value={price}
            keyboardType="numeric"
            onChangeText={setPrice}
          />
        </View>

        {/* Stock */}
        <Text style={styles.label}>Stock</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter stock count"
            style={styles.input}
            placeholderTextColor="#A4A8AE"
            value={stock}
            keyboardType="numeric"
            onChangeText={setStock}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {mode === "add" ? "Add Product" : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: moderateScale(20) },
  label: { fontSize: moderateScale(14), color: "#333", marginBottom: moderateScale(5), fontWeight: "600" },
  inputContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
    marginBottom: moderateScale(15),
  },
  input: { fontSize: moderateScale(14), color: "#000" },
  submitBtn: {
    backgroundColor: "#9C6FB8",
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(12),
    marginTop: moderateScale(20),
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: moderateScale(16), fontWeight: "700" },
});
